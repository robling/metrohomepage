<!DOCTYPE html>
<html >
<head>
<meta charset="UTF-8">

<?php
/*	use file_get_content to get 
 *	$stream = file_get_contents($url);//目的页面内容获取
 */
?>
<?php
	$ch = curl_init();
	$timeout = 5;
	$url="http://api.hitokoto.us/rand";
	curl_setopt ($ch, CURLOPT_URL, $url);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$file_contents = curl_exec($ch);
	curl_close($ch);
	$array = json_decode($file_contents,1);//转换为PHP数组
	
	$ch = curl_init();
	$url="http://bangumi.tv/feed/user/spdf/interests";
	curl_setopt ($ch, CURLOPT_URL, $url);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$stream = curl_exec($ch);//目的页面内容获取
	curl_close($ch);
	$xml = simplexml_load_string($stream, 'SimpleXMLElement', LIBXML_NOCDATA);
	$catch = $xml->channel->item[0];
	$title = $catch->title[0];
	$link = $catch->link[0];
	$pic = $dec = $catch->description[0];
?>