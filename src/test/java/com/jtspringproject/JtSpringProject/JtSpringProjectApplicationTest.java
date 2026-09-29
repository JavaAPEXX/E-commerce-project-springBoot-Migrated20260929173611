```java
package com.jtspringproject.JtSpringProject;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.SpringApplication;

@ExtendWith(MockitoExtension.class)
class JtSpringProjectApplicationTest {

    @Test
    @DisplayName("givenValidArgs_whenMain_thenSpringApplicationRunInvoked")
    void givenValidArgs_whenMain_thenSpringApplicationRunInvoked() {
        // Arrange
        String[] args = new String[] { "--spring.profiles.active=test" };
        try (MockedStatic<SpringApplication> mockedSpring = org.mockito.Mockito.mockStatic(SpringApplication.class)) {
            // Act
            assertDoesNotThrow(() -> JtSpringProjectApplication.main(args));

            // Assert
            mockedSpring.verify(() -> SpringApplication.run(JtSpringProjectApplication.class, args), times(1));
        }
    }

    @Test
    @DisplayName("givenNullArgs_whenMain_thenSpringApplicationRunInvokedWithNull")
    void givenNullArgs_whenMain_thenSpringApplicationRunInv