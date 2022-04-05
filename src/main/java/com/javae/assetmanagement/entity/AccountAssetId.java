package com.javae.assetmanagement.entity;


import java.io.Serializable;

public class AccountAssetId implements Serializable {

    private Long accountId;
    private String assetId;

    public AccountAssetId() {
    }

    public AccountAssetId(Long accountId, String assetId) {
        this.accountId = accountId;
        this.assetId = assetId;
    }
}
