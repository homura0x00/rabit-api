package handler

import (
	"backend-go/internal/service"
	"backend-go/internal/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type InterfaceInfoHandler struct {
	svc service.InterfaceInfoService
}

// TODO interfaceInfo handler设计

func NewInterfaceHandler(svc service.InterfaceInfoService) *InterfaceInfoHandler {
	return &InterfaceInfoHandler{svc: svc}
}

func (h *InterfaceInfoHandler) GetDetail(c *gin.Context) {
	idStr := c.Param("id")
	id, _ := strconv.ParseInt(idStr, 10, 64)

	data, err := h.svc.GetInterfaceInfo(c.Request.Context(), id)
	if err != nil {
		utils.Fail(c, http.StatusNoContent, "NOT_FOUNT", "not interface with that ID")
		return
	}

	utils.OK(c, data)
}
