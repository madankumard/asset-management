package com.javae.assetmanagement.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/verify")
public class VerificationController {

    private static final Logger logger = LoggerFactory.getLogger(VerificationController.class);
}
