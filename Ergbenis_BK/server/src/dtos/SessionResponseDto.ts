import { UserResponseDto } from './UserResponseDto';

export class SessionResponseDto {
    constructor(public readonly token: string, public readonly user: UserResponseDto) {}
}