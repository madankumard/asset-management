package com.javae.assetmanagement.model;

import org.springframework.web.multipart.MultipartFile;

public class DocumentModel {

    private String accountId;
    private String documentType;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

}
