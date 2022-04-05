package com.javae.assetmanagement.services.account;

import com.javae.assetmanagement.entity.Account;

import java.util.Optional;

public interface AccountService {

    public void saveAccount(Account account);
    Optional<Account> getAccountDetails(String accountId);
}
