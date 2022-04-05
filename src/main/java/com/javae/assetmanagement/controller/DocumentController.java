package com.javae.assetmanagement.controller;

import com.javae.assetmanagement.entity.Document;
import com.javae.assetmanagement.model.DocumentModel;
import com.javae.assetmanagement.services.document.DocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/document")
public class DocumentController {

    private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);

    @Autowired
    private DocumentService documentService;

    @PostMapping("/fileupload")
    public String fileUpload(@RequestParam String documentType,
                             @RequestParam String accountId,
                             @RequestParam("file") MultipartFile file) throws IOException {
        logger.info("documentType: " + documentType + "accountId: " + accountId);
        byte[] bytes = file.getBytes();
        Document document = new Document();
        document.setDocumentType(documentType);
        document.setDocumentFile(bytes);

        List<Document> documentList = new ArrayList<>();
        documentList.add(document);

        return documentService.saveDocument(documentType, accountId, documentList);
    }

}
