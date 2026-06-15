import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { createAuditSchema } from './dto/create-audit.dto';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  async create(@Body() body: any) {
    const result = createAuditSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }
    return this.auditsService.create(result.data);
  }

  @Get()
  async findAll() {
    return this.auditsService.findAll();
  }
}
