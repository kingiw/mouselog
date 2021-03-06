// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

package controllers

import "github.com/microsoft/mouselog/detect"

func (c *APIController) ListRules() {
	c.Data["json"] = detect.GetRuleListJson()
	c.ServeJSON()
}
