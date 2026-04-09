import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoomMediaService } from './room-media.service';
import { CreateRoomMediaDto } from './dto/create-room-media.dto';
import { UpdateRoomMediaDto } from './dto/update-room-media.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Медиафайлы аудиторий')
@Controller('api/room-media')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RoomMediaController {
  constructor(private readonly mediaService: RoomMediaService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Создать медиафайл' })
  create(@Body() createDto: CreateRoomMediaDto) {
    return this.mediaService.create(createDto);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Получить все медиафайлы аудитории' })
  findByRoom(@Param('roomId') roomId: string) {
    return this.mediaService.findByRoom(roomId);
  }

  @Get('room/:roomId/panorama')
  @ApiOperation({ summary: 'Получить панораму аудитории' })
  findPanorama(@Param('roomId') roomId: string) {
    return this.mediaService.findPanoramaByRoom(roomId);
  }

  @Get('room/:roomId/photos')
  @ApiOperation({ summary: 'Получить фотографии аудитории' })
  findPhotos(@Param('roomId') roomId: string) {
    return this.mediaService.findPhotosByRoom(roomId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить медиафайл по ID' })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Обновить медиафайл' })
  update(@Param('id') id: string, @Body() updateDto: UpdateRoomMediaDto) {
    return this.mediaService.update(id, updateDto);
  }

  @Patch(':id/sort')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Обновить порядок сортировки' })
  updateSortOrder(
    @Param('id') id: string,
    @Body('sortOrder') sortOrder: number,
  ) {
    return this.mediaService.updateSortOrder(id, sortOrder);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Удалить медиафайл' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}