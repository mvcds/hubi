Feature: Parse Files
  As a developer
  I want to parse domain files into useful files
  In order to not have to manually change the latter

  Scenario: Happy path
    Given some glob pattern
      And some output folder
    When I run ParseFiles
    Then the glob pattern find a domain file
      And the domain file is read
      And the domain file is converted into json
      And the domain file is parsed
