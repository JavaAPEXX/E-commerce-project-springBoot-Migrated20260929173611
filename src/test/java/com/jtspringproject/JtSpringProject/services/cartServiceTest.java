```java
package com.jtspringproject.JtSpringProject.services;

import com.jtspringproject.JtSpringProject.dao.cartDao;
import com.jtspringproject.JtSpringProject.models.Cart;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class cartServiceTest {

    @Mock
    private cartDao cartDao;

    @InjectMocks
    private cartService cartService;

    @Test
    @DisplayName("Given a valid cart, when adding to cart, then return the saved cart")
    void givenValidCart_whenAddCart_thenReturnSavedCart() {
        // Arrange
        Cart inputCart = new Cart();
        Cart savedCart = new Cart();
        when(cartDao.addCart(inputCart)).thenReturn(savedCart);

        // Act
        Cart result = cartService.addCart(inputCart);

        // Assert
        assertNotNull(result);
        assertSame(savedCart, result);
        verify(cartDao, times(1)).addCart(inputCart);
    }

    @Test
    @DisplayName("Given a null cart, when adding to cart, then return null")
    void givenNullCart_whenAddCart_thenReturnNull() {
        // Arrange
        when(cartDao.addCart(null)).thenReturn(null);

        // Act
        Cart result = cartService.addCart(null);

        // Assert
        assertNull(result);
        verify(cartDao, times(1)).addCart(null);
    }

    @Test
    @DisplayName("Given a valid cart, when adding to cart, then throw exception if dao fails")
    void givenValidCart_whenAddCart_thenThrowExceptionIfDaoFails() {
        // Arrange
        Cart inputCart = new Cart();
        when(cartDao.addCart(inputCart)).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> cartService.addCart(inputCart));
        verify(cartDao, times(1)).addCart(inputCart);
    }

    @Test
    @DisplayName("Given existing carts, when getting carts, then return list of carts")
    void givenExistingCarts_whenGetCarts_thenReturnListOfCarts() {
        // Arrange
        List<Cart> expectedCarts = Arrays.asList(new Cart(), new Cart());
        when(cartDao.getCarts()).thenReturn(expectedCarts);

        // Act
        List<Cart> result = cartService.getCarts();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertSame(expectedCarts, result);
        verify(cartDao, times(1)).getCarts();
    }

    @Test
    @DisplayName("Given empty database, when getting carts, then return empty list")
    void givenEmptyDatabase_whenGetCarts_thenReturnEmptyList() {
        // Arrange
        List<Cart> emptyList = Collections.emptyList();
        when(cartDao.getCarts()).thenReturn(emptyList);

        // Act
        List<Cart> result = cartService.getCarts();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(cartDao, times(1)).getCarts();
    }

    @Test
    @DisplayName("Given null result from dao, when getting carts, then return null")
    void givenNullResultFromDao_whenGetCarts_