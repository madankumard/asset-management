package com.javae.assetmanagement.services.asset;

import com.javae.assetmanagement.entity.Account;
import com.javae.assetmanagement.entity.AccountAsset;
import com.javae.assetmanagement.entity.Asset;
import com.javae.assetmanagement.repository.AccountRepository;
import com.javae.assetmanagement.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AssetServiceImpl implements AssetService{

    private final AssetRepository assetRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public AssetServiceImpl(AssetRepository assetRepository,
                            AccountRepository accountRepository) {
        this.assetRepository = assetRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public String saveAssets(String[] assets, String accountId) {

        System.out.println("assets: "+ assets + "accountId: "+ accountId);

        Optional<Account> accountOptional = accountRepository.findById(Long.valueOf(accountId));

        if(accountOptional.isPresent()) {
            Account account = accountOptional.get();
            List<AccountAsset> accountAssetList = new ArrayList<>();
            if (null != assets) {
                for (String s : assets) {
                    AccountAsset accountAsset = new AccountAsset();
                    accountAsset.setAssetId(s);
                    accountAsset.setAccountId(Long.valueOf(accountId));
                    accountAssetList.add(accountAsset);
                }
            }else{
                return "No assets to be saved!";
            }
            account.setAccountAssetList(accountAssetList);
            accountRepository.save(account);
        }else {
            return "Account Not Found!";
        }
        return "Assets saved successfully";
    }

    @Override
    public List<Asset> getAssets() {
        return assetRepository.findAll();
    }
}
