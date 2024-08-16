import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ example: 'Buy milk' })
  title?: string;

  @ApiProperty({ example: true })
  completed?: boolean;
}
