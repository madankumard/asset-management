package com.javae.assetmanagement.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_id_generator")
    @SequenceGenerator(name = "account_id_generator",
            sequenceName = "account_seq",
            initialValue = 20000,
            allocationSize = 50)
    private Long accountId;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String oid;

    @Column
    private String email;

    @Column
    private String gender;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "home_address_id")
    private Address homeAddress;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "corr_address_id")
    private Address correspondenceAddress;

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Document> documentList;

    @OneToMany(mappedBy = "accountId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AccountAsset> accountAssetList;

    @Column
    private String status;

    @Column
    private String taxId;

    @Column
    private String taxType;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public Address getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(Address homeAddress) {
        this.homeAddress = homeAddress;
    }

    public Address getCorrespondenceAddress() {
        return correspondenceAddress;
    }

    public void setCorrespondenceAddress(Address correspondenceAddress) {
        this.correspondenceAddress = correspondenceAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
    }

    /*public Set<Asset> getAssetList() {
        return assetList;
    }

    public void setAssetList(Set<Asset> assetList) {
        this.assetList = assetList;
    }*/


    public List<AccountAsset> getAccountAssetList() {
        return accountAssetList;
    }

    public void setAccountAssetList(List<AccountAsset> accountAssetList) {
        this.accountAssetList = accountAssetList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getTaxType() {
        return taxType;
    }

    public void setTaxType(String taxType) {
        this.taxType = taxType;
    }
}
