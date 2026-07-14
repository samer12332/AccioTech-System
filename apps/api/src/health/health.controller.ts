import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Check API health" })
  @ApiOkResponse({
    description: "The API is available.",
    schema: {
      example: {
        status: "ok",
        service: "acciotech-api",
      },
    },
  })
  getHealth() {
    return {
      status: "ok",
      service: "acciotech-api",
    };
  }
}
