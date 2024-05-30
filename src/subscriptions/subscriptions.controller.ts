import { RequestContext } from 'src/auth/dto/login.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { SubscriptionsService } from './subscriptions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/subscribe')
  subscribe(@Request() req: RequestContext, @Param('id') id: string) {
    return this.subscriptionsService.subscribe(id, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unsubscribe')
  unsubscribe(@Request() req: RequestContext, @Param('id') id: string) {
    return this.subscriptionsService.unsubscribe(id, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-subscriptions')
  getMySubscriptions(@Request() req: RequestContext) {
    return this.subscriptionsService.getMySubscriptions(req.user.username);
  }
}
