### Arten von Daten
* Skalar: 1
* Vektor: (1, 3)
* Matrix: (1, 3) / (2, 4)

### Datentype in anderen Programmiersprachen
| Datentyp | Beispiel als PHP-Code | PHP Pendant | 
|----|----|----|
|Null, Nil, None|null|null|
|int|5|int|
|string|"foobar"|string|
|struct, class| `class Student { public $name; }` |class|
|List, Vector| `[1, 2, 3, 4]` | array ("keine keys") |
|Tupel| Rust/Python `(1,2)` | array `[1,2]` (aber egtl nicht vorhanden)|
|HashMap, Dictionary| `["foo" => "bar"]` | array (asso) |
|Pointer, Reference| `$a=5; $b = &$a; $b = 8; echo $a; // 8` | &|

---
// Daten im RAM
|- 0x1f     |- 0x2b   
0001001010100101010101010001

$a = 5;
Im Speicher: 0..(60mal)..0101 (64-bit)

$b = $a;  // kopiert Speicherinhalt von $a nach $b an neue Speicheradresse
$b = &$a; // hinterlegt in $b die selbe Speicheradresse wie in $a

---
## "Pass by value" 
* Standard für primitive Datentypen
```
function change ($a) {
    $a = 12;
}

$x = 5;
change($x);
echo $x; // 5 
```

## "Pass by reference"
* Standard für Objekte
```
function change ($a) {
    $a->foo = 12;
}

$x = new \stdClass()
$x->foo = 5;
change($x);
echo $x->foo; // 12
```

## Sonderfall `array`
* Copy on Write (COW)
```
function change (array $a) {
    $a['foo'] = 12
}

$x = ['foo' => 5];
change($x);
echo $x['foo']; // 5
```

## Einfach verkettete Liste
```
class Element {
    public ?Element $next = null;

    public string $name;

    public function __construct($name) { $this->name = $name; }
}

// zwei Elemente
$e1 = new Element();
$e2 = new Element();
$e3 = new Element();

// $e2 folgt jetzt auf $e1
$e1->next = $e2;
$e2->next = $e3;

$e = $e1;
while ($e->next) {
    // do something with $e
    $e = $e->next;
}

$einkaufsliste = new Element('Hosen');
function addToCart($e, $name) {
    $e->next = new Element($name);
}
addToCart($einkaufsliste, 'Eier');
```

## Doppelt verkette Liste
```
class Element {
    public ?Element $prev = null;
    public ?Element $next = null;
}
```

## Wofür brauch ich sowas?
### Mit Array
```
$books = [
    "Adam und Eva",
    "Kurze Geschichte der Zeit",
    "Weltuntergang",
];

$newBook = "Marcs Blog";
// BAD:
$books[] = $newBook;
sort($books);

foreach ($books as $idx => $b) {
    if (strcmp($b, $newBook) > 0) {
        // aktuelles Buch $b muss hinter $newBook
        // BAAAAAD:
        $books = array_merge(array_slice($book, 0, $b-1), [$newBook], array_slice($books, $b));
    }
}

foreach ($books as $b) {
    echo $b;
}
```

### Mit Liste
```
class Book {
    public ?Book $next = null;
    public string $name;
    public function __construct($name) { $this->name = $name; }
}

$books             = new Book("Adam und Eva");
$books->next       = new Book("Kurze Geschichte der Zeit");
$books->next->next = new Book("Weltuntergang");
 

$nb = new Book($newBook);

function insert(?Book $list, Book $newBook) {
    $b = $list;
    while (true) {
        if ($b->next === null) {
            // am Ende anhängen
            $b->next = $nb;
            break;
        } elseif (strcmp($b->next->name, $newBook) > 0) {
            // in der Mitte einfügen
            $nb->next = $b->next;
            $b->next = $nb;
            break;
        }
        $b = $b->next;
    }
}

$library = new Book("Adam und Eva");
insert($library, new Book("Kurze Geschichte der Zeit"));
insert($library, new Book("Weltuntergang"));
show($library);

function show (Book $list) {
    $b = $list;
    do {
        echo $b->name;
        $b = $b->next;
    } while ($b);
}
```

---
## Array-Operationen in PHP
|Aktion|PHP Code|
|----|----|
|anhängen, push| $array[] |
|sortieren| sort($array), usort, rsort, ksort, krsort |
|zusammenführen| $newArray = array_merge($array1, $array2) |
|Unterschied| $diff = array_diff($a1, $a2) |
|Gemeinsamkeiten| $both = array_intersect($a1, $a2) |
|Duppletten entfernen| $without = array_unique($array) |
|vom Ende entfernen| $element = array_pop($array) |
|vom Anfang entfernen| $element = array_shift($array) |
|nur die Werte| $values = array_values($array) |
|nur die Keys| $keys = array_keys($array) |

$array[][]