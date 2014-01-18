# Hex0r

Hex0r is some simple javascript that shows a hex viewer for binary or non-binary data. This was original based on HexViewJS, but I wanted some more options for the project I'm working on, so created this new project.

# Example

![alt tag](http://raw.github.com/gratajik/Hex0r/master/help/example_screenshot.PNG)

# Options

All parameters should be on a div of class "hex04window".  They use data attributes.

Example
```` javascript
<div class="hex0rwindow" data-row-width="16" data-word-size="1" data-row-break="8"
        data-trim="true" data-base64="true" data-caption="Hex0r Example - base 64 file"
        data-highlights="" data-show-line-nums="true">
       Some data to show in the viewer
</div>
````

*  **row_width** The number of bytes to show per row
*  **word-size** The word size to show. Allows you to show the binary data in 1, 2 or 4 (or more) byte groups.
*  **row-break** Break between groups
*  **trim** Trim whitespace
*  **base64** Base 64 decode the data in the div (if false, will show exactly that is in the div)
*  **caption** The bottom caption for the viewer
*  **highlights** Highlight areas of the viewer hex
*  **show-line-nums** Show the line number on the left side. 
