// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

package trace

type SessionJson struct {
	Id string `json:"id"`

	TraceSize int `json:"traceSize"`

	TN int `json:"tn"`
	FP int `json:"fp"`
	FN int `json:"fn"`
	TP int `json:"tp"`
	UN int `json:"un"`

	RuleCounts []int `json:"ruleCounts"`
}
