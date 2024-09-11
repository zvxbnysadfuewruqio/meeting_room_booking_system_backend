import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { generateParseIntPipe } from 'src/utils';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('list')
  async list(
      @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo')) pageNo: number,
      @Query('pageSize', new DefaultValuePipe(10), generateParseIntPipe('pageSize')) pageSize: number,
      @Query('username') username: string,
      @Query('meetingRoomName') meetingRoomName: string,
      @Query('meetingRoomPosition') meetingRoomPosition: string,
      @Query('bookingTimeRangeStart') bookingTimeRangeStart: number,
      @Query('bookingTimeRangeEnd') bookingTimeRangeEnd: number,
  ) {
      return this.bookingService.find(pageNo, pageSize, username, meetingRoomName, meetingRoomPosition, bookingTimeRangeStart, bookingTimeRangeEnd);
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() booking: CreateBookingDto, @UserInfo('userId') userId: number) {
      await this.bookingService.add(booking, userId);
      return 'success'
  }

}
