```java
package com.jtspringproject.JtSpringProject.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jtspringproject.JtSpringProject.dao.productDao;
import com.jtspringproject.JtSpringProject.models.Product;

@ExtendWith(MockitoExtension.class)
class productServiceTest {

    @Mock
    private productDao productDao;

    @InjectMocks
    private productService productService;

    @Test
    @DisplayName("Given valid products in DAO, when getProducts is called, then return the list of products")
    void givenValidProductsInDao_whenGetProducts_thenReturnListOfProducts() {
        // Arrange
        Product product1 = new Product();
        product1.setId(1);
        product1.setName("Product 1");
        Product product2 = new Product();
        product2.setId(2);
        product2.setName("Product 2");
        List<Product> expectedProducts = Arrays.asList(product1, product2);
        when(productDao.getProducts()).thenReturn(expectedProducts);

        // Act
        List<Product> actualProducts = productService.getProducts();

        // Assert
        assertNotNull(actualProducts);
        assertEquals(2, actualProducts.size());
        assertSame(expectedProducts, actualProducts);
        verify(productDao, times(1)).getProducts();
    }

    @Test
    @DisplayName("Given empty list in DAO, when getProducts is called, then return empty list")
    void givenEmptyListInDao_whenGetProducts_thenReturnEmptyList() {
        // Arrange
        List<Product> emptyList = Collections.emptyList();
        when(productDao.getProducts()).thenReturn(emptyList);

        // Act
        List<Product> actualProducts = productService.getProducts();

        // Assert
        assertNotNull(actualProducts);
        assertTrue(actualProducts.isEmpty());
        verify(productDao, times(1)).getProducts();
    }

    @Test
    @DisplayName("Given null list in DAO, when getProducts is called, then return null")
    void givenNullListInDao_whenGetProducts_thenReturnNull() {
        // Arrange
        when(productDao.getProducts()).thenReturn(null);

        // Act
        List<Product> actualProducts = productService.getProducts();

        // Assert
        assertNull(actualProducts);
        verify(productDao, times(1)).getProducts();
    }

    @Test
    @DisplayName("Given DAO throws exception, when getProducts is called, then propagate exception")
    void givenDaoThrowsException_whenGetProducts_thenPropagateException() {
        // Arrange
        RuntimeException expectedException = new RuntimeException("Database error");
        when(productDao.getProducts()).thenThrow(expectedException);

        // Act & Assert
        RuntimeException actualException = assertThrows(RuntimeException.class, () -> {
            productService.getProducts();
        });
        assertEquals("Database error", actualException.getMessage());