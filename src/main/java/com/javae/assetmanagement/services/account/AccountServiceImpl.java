package com.javae.assetmanagement.services.account;

import com.javae.assetmanagement.entity.Account;
import com.javae.assetmanagement.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository){
        this.accountRepository = accountRepository;
    }

    @Override
    public void saveAccount(Account account) {
        accountRepository.save(account);
    }

    @Override
    public Optional<Account> getAccountDetails(String accountId) {
        return accountRepository.findById(Long.valueOf(accountId));
    }
}
