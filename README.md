# Hex0r+

hex0r+ is a lightweight library for displaying hexadecimal and ASCII data in a table format. This project is a fork of [gratajik's Hex0r project](https://github.com/gratajik/Hex0r). It builds upon the original by fixing various bugs and adding several new features to enhance functionality.

# Online Demo

https://h.ihainan.me/hex/

# Screenshots

Display raw text:

![raw_text](https://imgur.ihainan.me/mfczqQB.png)

Display a byte array (base64 encoded):

![byte_array](https://imgur.ihainan.me/mfczqQB.png)

Highlight hex area:

![highlight_area](https://imgur.ihainan.me/omliFks.png)

Highlight hex area when mouse-over:

![mouse-over](https://imgur.ihainan.me/GGsttE5.png)

# Options

All parameters should be on a div of class "hex04window".  Data attributes are used to control it.

Example
```` html
<div class="hex0rwindow" data-row-width="16" data-word-size="1" data-row-break="8" data-trim="true"
    data-base64="true" data-caption="SSH Protocol - Client's Algorithm List" data-highlight-on-hover-only="true"
    data-highlights="
        0:3:#F4FA58: Packet Length (= 196) // 4 bytes,
        4:4:#F4FA58: Padding Length (= 6) // 1 byte,
        5:5:#F4FA58: SSH_MSG_KEXINIT // 1 byte,
        6:21:#F4FA58: Cookie // 16,
        22:94:#F4FA58: kex_algorithms // 4 + 69 bytes,
        95:110:#F4FA58: server_host_key_algorithms // 4 + 12 bytes,
        111:124:#F4FA58: encryption_algorithms_client_to_server // 4 + 10 bytes,
        125:138:#F4FA58: encryption_algorithms_server_to_client // 4 + 10 bytes,
        139:151:#F4FA58: mac_algorithms_client_to_server // 4 + 9 bytes,
        152:164:#F4FA58: mac_algorithms_server_to_client // 4 + 9 bytes,
        165:172:#F4FA58: compression_algorithms_client_to_server // 4 + 4 bytes,
        173:180:#F4FA58: compression_algorithms_server_to_client // 4 + 4 bytes,
        181:184:#F4FA58: languages_client_to_server // 4 + 0 bytes,
        185:188:#F4FA58: languages_client_to_server // 4 + 0 bytes,
        189:189:#F4FA58: first_kex_packet_follows // 1 byte,
        190:193:#F4FA58: 0 (int\,reserved for future extension) // 4 bytes,
        194:199:#F4FA58: Padding // 6 bytes" data-show-line-nums="true"
    title="SSH Protocol - Client's Algorithm List">
    AAAAxAYUbzQ63GkVhEqdhC02TJzuywAAAEVkaWZmaWUtaGVsbG1hbi1ncm91cDE0LXNoYTI1NixleHQtaW5mby1jLGtleC1zdHJpY3QtYy12MDBAb3BlbnNzaC5jb20AAAAMcnNhLXNoYTItNTEyAAAACmFlczI1Ni1jdHIAAAAKYWVzMjU2LWN0cgAAAAlobWFjLXNoYTEAAAAJaG1hYy1zaGExAAAABG5vbmUAAAAEbm9uZQAAAAAAAAAAAAAAAAAAAAAAAAA=
</div>
````


* **data-row-width**: Number of bytes per row.
* **data-word-size**: Number of bytes per word.
* **data-row-break**: Number of bytes before a visual break.
* **data-base64**: Boolean indicating if input data is base64 encoded.
* **data-trim**: Boolean indicating if whitespace should be trimmed from input.
* **data-caption**: Caption text for the table.
* **data-highlight-on-hover-only**: Boolean to enable/disable highlight on hover only.
* **data-show-line-nums**: Boolean to show/hide line numbers.
* **data-highlights**: Comma-separated ranges, colors and hints for highlighting.

# Usage

Take a look at hex0r_example.html for the sample.

You will need to include jquery
``` html
<script src="https://code.jquery.com/jquery-3.6.0.min.js" type="text/javascript"></script>
````

Include the style sheet 
``` html
<link rel="stylesheet" type="text/css" href="hex0r.css" />
````

Create a **div** for class **hex04rwindow**, fill out the params, and, inside the div, include the data you would like to show the viewer.  Any number of viewers can be on a page.

``` html
<div class="hex0rwindow" data-row-width="16" data-word-size="1" data-row-break="8" data-trim="true"
    data-base64="true" data-caption="Hex0r Example - base 64 file" data-highlights="" data-show-line-nums="true">
    /9j/4AAQSkZJRgABAQEASABIAAD/4RzmRXhpZgAATU0AKgAAAAgADAEPAAIAAAAJ
    AAAAngEQAAIAAAAQAAAAqAESAAMAAAABAAEAAAEaAAUAAAABAAAAuAEbAAUAAAAB
    AAAAwAEoAAMAAAABAAIAAAExAAIAAAAvAAAAyAEyAAIAAAAUAAAA+AITAAMAAAAB
    AAIAAIKYAAIAAAAFAAABDIdpAAQAAAABAAABEsSlAAcAAAAcAAAEkAAABKxGVUpJ
    RklMTQAARmluZVBpeCBGNDU1ICAgAAAAAEgAAAABAAAASAAAAA==
</div>
```
