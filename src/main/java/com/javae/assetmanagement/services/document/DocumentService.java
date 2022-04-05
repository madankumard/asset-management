package com.javae.assetmanagement.services.document;

import com.javae.assetmanagement.entity.Document;

import java.util.List;

public interface DocumentService {
    String saveDocument(String documentType, String accountId, List<Document> documentList);
}
