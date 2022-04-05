package com.javae.assetmanagement.services.asset;

import com.javae.assetmanagement.entity.Account;
import com.javae.assetmanagement.entity.Asset;

import java.util.List;
import java.util.Optional;

public interface AssetService {

    String saveAssets(String[] assets, String accountId);
    List<Asset> getAssets();
}
