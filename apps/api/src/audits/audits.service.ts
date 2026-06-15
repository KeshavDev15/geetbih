import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAuditDto } from './dto/create-audit.dto';

@Injectable()
export class AuditsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuditDto: CreateAuditDto) {
    return this.prisma.auditLead.create({
      data: {
        email: createAuditDto.email,
        bottleneck: createAuditDto.bottleneck,
        scale: createAuditDto.scale,
      },
    });
  }

  async findAll() {
    return this.prisma.auditLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
