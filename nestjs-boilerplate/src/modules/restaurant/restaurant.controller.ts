import { API_CONFIG } from '@/configs/constant.config';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDocument } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'restaurants',
})
@ApiTags('Restaurant')
@ApiBearerAuth()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(@Body() body: CreateRestaurantDto): Promise<RestaurantDocument> {
    return this.restaurantService.createRestaurant(body);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string): Promise<RestaurantDocument> {
    return this.restaurantService.getRestaurant(id);
  }

  @Get()
  async getListRestaurant(): Promise<RestaurantDocument[]> {
    return this.restaurantService.getListRestaurant();
  }
}
