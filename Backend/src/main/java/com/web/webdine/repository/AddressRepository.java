package com.web.webdine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
