package com.lawer.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lawer.domain.Accounts;
import com.lawer.repository.AccountsRepository;
import com.lawer.web.rest.errors.BadRequestAlertException;
import com.lawer.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Accounts.
 */
@RestController
@RequestMapping("/api")
public class AccountsResource {

    private final Logger log = LoggerFactory.getLogger(AccountsResource.class);

    private static final String ENTITY_NAME = "accounts";

    private final AccountsRepository accountsRepository;

    public AccountsResource(AccountsRepository accountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    /**
     * POST  /accounts : Create a new accounts.
     *
     * @param accounts the accounts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accounts, or with status 400 (Bad Request) if the accounts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/accounts")
    @Timed
    public ResponseEntity<Accounts> createAccounts(@RequestBody Accounts accounts) throws URISyntaxException {
        log.debug("REST request to save Accounts : {}", accounts);
        if (accounts.getId() != null) {
            throw new BadRequestAlertException("A new accounts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Accounts result = accountsRepository.save(accounts);
        return ResponseEntity.created(new URI("/api/accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /accounts : Updates an existing accounts.
     *
     * @param accounts the accounts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accounts,
     * or with status 400 (Bad Request) if the accounts is not valid,
     * or with status 500 (Internal Server Error) if the accounts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/accounts")
    @Timed
    public ResponseEntity<Accounts> updateAccounts(@RequestBody Accounts accounts) throws URISyntaxException {
        log.debug("REST request to update Accounts : {}", accounts);
        if (accounts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Accounts result = accountsRepository.save(accounts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accounts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /accounts : get all the accounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accounts in body
     */
    @GetMapping("/accounts")
    @Timed
    public List<Accounts> getAllAccounts() {
        log.debug("REST request to get all Accounts");
        return accountsRepository.findAll();
    }

    /**
     * GET  /accounts/:id : get the "id" accounts.
     *
     * @param id the id of the accounts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accounts, or with status 404 (Not Found)
     */
    @GetMapping("/accounts/{id}")
    @Timed
    public ResponseEntity<Accounts> getAccounts(@PathVariable Long id) {
        log.debug("REST request to get Accounts : {}", id);
        Optional<Accounts> accounts = accountsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accounts);
    }

    /**
     * DELETE  /accounts/:id : delete the "id" accounts.
     *
     * @param id the id of the accounts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccounts(@PathVariable Long id) {
        log.debug("REST request to delete Accounts : {}", id);

        accountsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
