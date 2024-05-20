import {
  StringField,
  NumberField,
  DateField,
  IsEmail,
} from 'src/decorators/field.decorator';

export class UpdateUserInformationDto {
  @NumberField({ int: true })
  user_id: number;

  @StringField()
  name: string;

  @StringField()
  gender: string;

  @StringField()
  department: string;

  @StringField()
  employee_number: string;

  @StringField()
  phone_number: string;

  @StringField({ email: true })
  email_address: string;

  @DateField({})
  date_of_birth: Date;

  @DateField({})
  contract_date: Date;
}