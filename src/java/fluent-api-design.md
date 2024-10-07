# Fluent API Design

Good APIs guide their users through a well-lit path, resulting in clearer code,
fewer mistakes and better maintainability

## What are Fluent APIs

> In software engineering, a fluent interface is an object-oriented API whose
> design relies extensively on method chaining. Its goal is to increase code
> legibility by creating a domain-specific language (DSL). The term was coined
> in 2005 by Eric Evans and Martin Fowler.
>
> -- <cite>wikipedia</cite>

> A **Cascading** API is designed to **allow** operations to be expressed via an
> unbroken sequence of chained method calls, which can be split over multiple
> statements. A **Fluent** API is a casscading API designed to **always** be
> expressed in a single statement
>
> -- <cite>David Beaumont</cite>

## Why ?

why do care about expressing something in a single statement ? what are the
**benefits** using Fluent APIs ?

- Fluent APIs are domain specific languages, which gives the code semantic
  meaning, make it easier to takle complexity of a domain
- Declerative: fluent API describe what to do and not how to do it, which hides
  most of the implementations details and makes the code self explanitory

> A well designed fluent API makes domain-specific operations more
> understandable & maintainable.
>
> -- <cite>David Beaumont</cite>

## Designing Fluent APIs

### Type Uniformity

wether or not to return the same type at each point of the chain

#### Homogenous APIs

uses a single type, which is useful for order-independent parameters

```java
var lineSplitter =  Splitter.on(',')
    .trimResults()
    .limit(4)


var lineSplitter =  Splitter.on(',')
    .limit(4)
    .trimResults()
```

#### Heterogenous APIs

uses different return type. they guide the user through series of distinct
steps. thy can express more complex operations and reuse common sub-APIs

```java
assertThat(multiMap)            // -> MultimapSubject
    .valuesForKey(testKey)      // -> IterableSubject
    .contains(testValues)       // -> Orderd
    .inOrder();
```

### Fallibility

Fallible APIs need to let caller know what happens when an operation fails.
There may be multiple methods for different cases.

Example for a Fallible API is the Guava `ImmutableMap` builder, which has a
`build` method, that can throw a runtime exception if you insert the same key
multiple times.

```java
ImmutableMap.builder()
    .putAll(firstMap)
    .putAll(secondMap)
    .build()
```

there is no way to tell from this code, that the build method can throw an
exception, which can be confusing. Fluent API (or APIs in general) should hide
implementation details, but it should be explicit or unsuprising.

Later in the version `31` two new methods were added the API of `ImmutableMap`:

- `buildOrThrow`
- `buildKeepingLast`

which makes it very clear, that building an `ImmutableMap` can throw an
exception

### Mutability

wether or not the API mutate the same object. **Mutable** APIs are usually
homogeneous, and often reflect the classic **builder pattern**.

```java
new StringBuilder()
    .append(key)
    .append("=")
    .append(value)
    .toString();
```

**Immutable** APIs are harder to misuse, but allocate intermediate instances,
which can be costly.

```java
for var line : lines {
    doSomethingWith(Splitter
        .on(',')
        .limit(4)
        .trimResults()
        .splitToList(line));
}
```

> Tip: when using **Immutable** APIs, caching intermediate results, that is used
> repeatedly is effective, and allows semantic naming

```java
var CSV_SPLITTER =  Splitter
        .on(',')
        .limit(4)
        .trimResults();

for var line : lines {
    doSomethingWith(CSV_SPLITTER.splitToList(line));
}
```

### Fluent Utilities

TODO

### Optional Parameters

valid no-op valie to bypass teh action of the method

### comparison

|              | Fluency       | Type Uniformity | Fallibility | Reusability | Mutability    |
| ------------ | ------------- | --------------- | ----------- | ----------- | ------------- |
| ImmutableMap | Cascading     | Homogeneous     | Fallible    | Reusable    | Mutable       |
| Streams      | Cascading     | Heterogeneous   | Infallible  | One-Shot    | It Depends... |
| Splitter     | Item1.3       | Homogeneous     | Infallible  | Reusable    | Immutable     |
| Flogger      | It Depends... | Homogeneous     | Infallible  | One-Shot    | Mutable       |
| Truth        | Fluent        | Heterogeneous   | Infallible  | One-Shot    | Immutable     |

### Tips & Tricks

- think hard about methdo naming
- consider parameter scope and method ordering carefully
- put required parameters in required methods
- let the problem domain inform choices like return type, mutability etc.
- be consistent

## Resources

- [Principles of Fluent API Design by David Beaumont](https://www.youtube.com/watch?v=VPu-ytfYTeU)
- [How to Create a Fluent API in C#](https://mitesh1612.github.io/blog/2021/08/11/how-to-design-fluent-api)
