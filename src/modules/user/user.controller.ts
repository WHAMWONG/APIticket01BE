import { Body, Controller, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';
import { ValidateUserSubmissionDto } from './dto/validate-user-submission.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user-information/validate_list')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async validateUserInformationList(@Body() validateUserSubmissionDto: ValidateUserSubmissionDto) {
    return this.validateUserInformation(validateUserSubmissionDto);
  }

  @Post('/user-information/validate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async validateUserInformation(@Body() validateUserSubmissionDto: ValidateUserSubmissionDto) {
    const validationResult = await this.userService.validateUserInformationSubmission(
      validateUserSubmissionDto.username,
      validateUserSubmissionDto.email,
      validateUserSubmissionDto.submissionData,
    );

    if (!validationResult.isValid) {
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: validationResult.errors,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Validation successful. All fields are valid.',
    };
  }
}