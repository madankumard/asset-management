package com.javae.assetmanagement.controller;

import com.javae.assetmanagement.entity.Account;
import com.javae.assetmanagement.entity.Address;
import com.javae.assetmanagement.model.AccountModel;
import com.javae.assetmanagement.services.account.AccountService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping(value = "/save")
    public ResponseEntity<Account> saveAccount(@RequestBody AccountModel accountModel) {
        Account account = new Account();
        System.out.println(accountModel);
        Address address = new Address();
        BeanUtils.copyProperties(accountModel, address);
        account.setHomeAddress(address);
        BeanUtils.copyProperties(accountModel, account);

        accountService.saveAccount(account);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @GetMapping(value = "getAccountDetails")
    public ResponseEntity<AccountModel> getAccountDetails(String accountId) {

        AccountModel accountModel = new AccountModel();

        Optional<Account> accountOptional = accountService.getAccountDetails(accountId);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            accountModel.setAccountId(account.getAccountId().toString());
            BeanUtils.copyProperties(account, accountModel);
            BeanUtils.copyProperties(account.getHomeAddress(), accountModel);
        } else {
            throw new RuntimeException("Account Not Found!");
        }

        return new ResponseEntity<>(accountModel, HttpStatus.OK);
    }

    @GetMapping(value = "/verify")
    public String verifyAccount(@RequestParam("status") String status) {
        return "Account Not verified";
    }
}
