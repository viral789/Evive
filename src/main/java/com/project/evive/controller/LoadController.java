package com.project.evive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoadController {

	@RequestMapping(value="/")
	public String Main(){
		return "index";
	}
}