package com.javae.assetmanagement.controller;

import com.javae.assetmanagement.services.asset.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/asset")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @RequestMapping("/save")
    public ResponseEntity<String> saveAssets(@RequestBody String[] assets,
                                             @RequestParam("accountId") String accountId) {
        String response = assetService.saveAssets(assets, accountId);
        return ResponseEntity.ok(response);
    }
}
