import { Router } from "express"
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller"

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()


deliveryLogsRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale", "customer"]))
// Aqui o ensureAuthenticated e o verify são aplicados abaixo, rotas mais restritas, devem ficar abaixo, passando as restrições antes delas, como a seguir
deliveryLogsRoutes.get("/:delivery_id/show", deliveryLogsController.show)

deliveryLogsRoutes.use(verifyUserAuthorization(["sale"]))
deliveryLogsRoutes.post("/", deliveryLogsController.create)

export { deliveryLogsRoutes }