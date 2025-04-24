<?php
// counters.php

// Definice statistik
$stats = [
  ['title' => 'Spokojených zákazníků',       'value' => 99, 'suffix' => '%'],
  ['title' => 'Úspěšně dokončených zakázek', 'value' => 93, 'suffix' => '%'],
  ['title' => 'Zaplněných kapacit',          'value' => 55, 'suffix' => '%'],
];

// Generování HTML
foreach ($stats as $stat) {
    echo '<div class="counter">';
    echo   '<div class="counter-title">' . htmlspecialchars($stat['title']) . '</div>';
    echo   '<div class="counter-number">' . (int)$stat['value']
               . '<span class="counter-suffix">' . htmlspecialchars($stat['suffix']) . '</span>'
           . '</div>';
    echo '</div>';
}
