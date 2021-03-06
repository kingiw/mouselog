// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

package detect

import "github.com/microsoft/mouselog/trace"

func checkSinglePoint(t *trace.Trace) (int, string, int, int, int) {
	if len(t.Events) == 1 {
		return 1, "only one point found", RuleSinglePoint, 0, len(t.Events)
	}

	x := t.Events[0].X
	y := t.Events[0].Y
	for i := 1; i < len(t.Events); i ++ {
		if t.Events[i].X != x || t.Events[i].Y != y {
			return 0, ReasonNone, RuleNone, -1, -1
		}
	}

	return 1, "only one point found", RuleSinglePoint, 0, len(t.Events)
}
