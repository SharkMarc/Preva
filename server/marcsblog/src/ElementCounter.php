<?php

namespace MarcsBlog;

use SimpleXMLElement;

class ElementCounter
{

	public function countElements(array $list, SimpleXMLElement $node): array
	{
		foreach ($node as $childname => $childnode) {
			If (!isset($list[$childname])) {
				$list[$childname] = 0;
			}
			$list[$childname]++;

			$list = $this->countElements($list, $childnode);
		}

		return $list;
	}

	public function countChildElements(SimpleXMLElement $node): array
	{
		$list = [];
		foreach ($node as $element => $elementNode) {
			if ($elementNode->count()) {
				if (isset($list[$element])) {
					if (!isset($list[$element][1])) {
						$list[$element] = [$list[$element]];
					}
					$list[$element][] = $this->countChildElements($elementNode);
				} else {
					$list[$element] = $this->countChildElements($elementNode);
				}
			} else {
				if (!isset($list[$element])) {
					$list[$element] = 0;
				}
				$list[$element]++;
			}
		}

		return $list;
	}

	public function outGoing(SimpleXMLElement $node, $file)
	{
		$list = [];
		foreach ($node as $element => $elementNode) {
			if ($elementNode->count()) {
				if (isset($list[$element])) {
					if (!isset($list[$element][1])) {
						$list[$element] = [$list[$element]];
					}
					$list[$element][] = $this->countChildElements($elementNode);
				} else {
					$list[$element] = $this->countChildElements($elementNode);
				}
			} else {
				if (!isset($list[$element])) {
					$list[$element] = 0;
				}
				$list[$element]++;
			}
		}

		return array_values($list);
	}
}