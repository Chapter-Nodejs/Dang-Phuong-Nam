import { API_CONFIG } from '@/configs/constant.config';
import { IResponseList } from '@/share/common/app.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { QueryParamDto } from './dto/query-param.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant-dto';
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
  async getListRestaurant(@Query() query: QueryParamDto): Promise<IResponseList<RestaurantDocument>> {
    return this.restaurantService.getListRestaurant(query);
  }

  @Patch(':id')
  async updateRestaurant(@Param('id') id: string, @Body() body: UpdateRestaurantDto): Promise<RestaurantDocument> {
    return this.restaurantService.updateRestaurant(id, body);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string): Promise<RestaurantDocument> {
    return this.restaurantService.deleteRestaurant(id);
  }
}
