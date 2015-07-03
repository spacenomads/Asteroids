<?php
	/**
	 * SETTINGS
	 */
	$dev = true;
	$devclass = '_dev';

	/**
	 * Converts a string to... well... another string that can be used as a class name :)
	 * @param  [string] $string Non-class-name friendly string
	 * @return [string]         New class-name firendly string ;)
	 */
	function to_class($string){
	  $string = str_replace(array('[\', \']'), '', $string);
	  $string = preg_replace('/\[.*\]/U', '', $string);
	  $string = preg_replace('/&(amp;)?#?[a-z0-9]+;/i', '-', $string);
	  $string = htmlentities($string, ENT_COMPAT, 'utf-8');
	  $string = preg_replace('/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i', '\\1', $string );
	  $string = preg_replace(array('/[^a-z0-9]/i', '/[-]+/') , '_', $string);
	  return strtolower(trim($string, '-'));
	}

?>