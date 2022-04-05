package com.javae.assetmanagement.services.document;

import com.javae.assetmanagement.entity.Account;
import com.javae.assetmanagement.entity.Document;
import com.javae.assetmanagement.repository.AccountRepository;
import com.javae.assetmanagement.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentServiceImpl implements DocumentService{


    private final DocumentRepository documentRepository;
    private final AccountRepository accountRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository, AccountRepository accountRepository) {
        this.documentRepository = documentRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public String saveDocument(String documentType, String accountId, List<Document> documentList) {

        System.out.println("accountId: "+ accountId);

        Optional<Account> accountOptional = accountRepository.findById(Long.valueOf(accountId));

        if(accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setDocumentList(documentList);
            accountRepository.save(account);
            return "Document Saved Successfully!";
        }

        return "Document Not Saved!";
    }
}
