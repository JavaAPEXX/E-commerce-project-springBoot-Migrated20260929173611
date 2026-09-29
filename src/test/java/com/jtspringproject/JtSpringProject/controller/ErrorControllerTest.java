```java
package com.jtspringproject.JtSpringProject.controller;

import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Method;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Unit tests for {@link ErrorController}.
 *
 * The controller is simple and has no external dependencies, therefore we use
 * {@link MockitoExtension} only to demonstrate the standard test setup with
 * {@link InjectMocks}.
 */
@ExtendWith(MockitoExtension.class)
class ErrorControllerTest {

    @InjectMocks
    private ErrorController errorController;

    @Test
    @DisplayName("Given a valid request, when accessDenied is invoked, then return view name '403'")
    void givenValidRequest_whenAccessDenied_then