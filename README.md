# Currency Converter

A responsive currency conversion web application built with HTML, CSS, and Vanilla JavaScript.

The application fetches the latest exchange rates from the Frankfurter API and allows users to convert amounts between supported currencies in real time.

## Live Demo

https://u-s-kunal.github.io/currency-converter/
---

## Overview

This project is a client-side currency converter developed using Vanilla JavaScript.

Exchange-rate data is fetched from the Frankfurter API, while currency selection, conversion calculations, validation, currency swapping, and flag updates are handled dynamically through JavaScript.

The project was built to practice working with external APIs, asynchronous JavaScript, DOM manipulation, and real-world data processing.

---

## Features

- Fetches latest exchange rates from an external API
- Supports multiple currencies
- USD used as the base currency for rate retrieval
- Convert amounts between selected currencies
- Currency swap functionality
- Dynamic currency selection
- Automatic currency flag updates
- Input validation
- API error handling
- Responsive user interface
- Real-time conversion when currency selection changes

---

## How It Works

The application retrieves the latest exchange rates from:

```text
https://api.frankfurter.dev/v1/latest?from=USD
