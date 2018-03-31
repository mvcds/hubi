Feature: Parse Domain File Into Source
  As a developer
  I want to parse a domain file into a source one
  In order to have a useful file

  Scenario: Simple attribute
    Given "simple" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Named attribute
    Given "named" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Required attribute
    Given "required" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string.required"

  Scenario: String attribute
    Given "string" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Short boolean attribute
    Given "bool" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "boolean"

  Scenario: Long boolean attribute
    Given "boolean" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "boolean"

  Scenario: Short integer attribute
    Given "int" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "integer"

  Scenario: Long integer attribute
    Given "integer" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "integer"

  Scenario: Float attribute
    Given "float" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Number attribute
    Given "number" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Decimal attribute
    Given "decimal" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Date attribute
    Given "date" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "date"

  Scenario: JSON attribute
    Given "json" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "json"

  Scenario: Object attribute
    Given "object" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "object"

  Scenario: Shape attribute
    Given "shape" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "object"

  Scenario: Entity attribute
    Given "entity" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "Person"

  Scenario: Simple array attribute
    Given "simple-array" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "[object]"

  Scenario: Typed attribute
    Given "typed-array" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "[Person]"
