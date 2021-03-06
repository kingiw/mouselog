// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

package controllers

import (
	"github.com/microsoft/mouselog/trace"
	"github.com/microsoft/mouselog/util"
)

func (c *APIController) GetImpressions() {
	c.Data["json"] = trace.GetImpressions(c.Input().Get("websiteId"), c.Input().Get("sessionId"), util.ParseInt(c.Input().Get("resultCount")), util.ParseInt(c.Input().Get("offset")), c.Input().Get("sortField"), c.Input().Get("sortOrder"))
	c.ServeJSON()
}

func (c *APIController) GetImpressionsAll() {
	c.Data["json"] = trace.GetImpressionsAll(c.Input().Get("websiteId"), util.ParseInt(c.Input().Get("resultCount")), util.ParseInt(c.Input().Get("offset")), c.Input().Get("sortField"), c.Input().Get("sortOrder"))
	c.ServeJSON()
}

func (c *APIController) GetImpression() {
	c.Data["json"] = trace.GetImpression(c.Input().Get("id"))
	c.ServeJSON()
}

func (c *APIController) DeleteImpression() {
	c.Data["json"] = trace.DeleteImpression(c.Input().Get("id"))
	c.ServeJSON()
}
