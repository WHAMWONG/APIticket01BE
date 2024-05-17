import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Injectable } from '@nestjs/common'
import { EntitySchema, Not, DataSource, ObjectType, FindOptionsWhere } from 'typeorm'

export interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [EntitySchema<E> | ObjectType<E>]
}

@ValidatorConstraint({ name: 'isEntityUnique', async: true })
@Injectable()
export class EntityUniqueValidator implements ValidatorConstraintInterface {
  constructor(protected readonly dataSource: DataSource) { }

  async validate<E>(value: any, args: UniqueValidationArguments<E>) {
    const [EntityClass] = args.constraints
    const entityRepo = await this.dataSource.getRepository(EntityClass)
    const primaryKey = await entityRepo.metadata.primaryColumns[0].propertyName
    
    const errors = [];
    let isValid = true;
    
    if (!value) {
      isValid = false;
      errors.push({ field: args.property, message: `The ${args.property} field cannot be empty` });
    } else {
      const query = {
        [args.property]: value,
        ...(args.object[primaryKey] && {
          [primaryKey]: Not(args.object[primaryKey]),
        }),
      } as FindOptionsWhere<E>
    
      const count = await entityRepo.count({ where: query })
    
      if (count > 0) {
        isValid = false;
        errors.push({ field: args.property, message: `A ${EntityClass.name} with this ${args.property} already exists` });
      }
    }
    
    return { isValid, errors };
  }

  defaultMessage<E>(args: UniqueValidationArguments<E>) {
    const entityName = this.dataSource.getRepository(args.constraints[0]).metadata.tableName;
    let message = `A ${entityName} with this ${args.property} already exists`;
    switch (args.property) {
      case 'username':
        message = 'The username is already taken';
        break;
      case 'email':
        message = 'The email is already in use';
        break;
    }
    return message;
  }
}

export function EntityUnique<E>(
  entity: EntitySchema<E> | ObjectType<E>,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: EntityUniqueValidator,
    })
  }
}