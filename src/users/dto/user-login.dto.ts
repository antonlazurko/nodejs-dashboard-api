import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;
	@IsString({ message: 'Password not specified' })
	password: string;
}
