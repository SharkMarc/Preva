<?php
namespace Preva\Element;

class ExclusiveGateway extends Node implements IsConnector, IsDecision
{
	public int $cognitiveWeight = 2;

	public int $bigCognitiveWeight = 3;
}