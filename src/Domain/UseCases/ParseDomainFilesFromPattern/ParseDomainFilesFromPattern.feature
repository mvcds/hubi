Feature: Parse Domain Files From Pattern
  As a developer
  I want to parse domain files using a glob pattern
  In order to not have to manually parse each one

  Scenario: Parse Domain Files From Pattern
    Given some glob pattern
      And some output folder
      And translator is log
    When I run ParseDomainFilesFromPattern
    Then the glob pattern find a domain file
      And an ubiquitous entity is created
