<?php
include 'incl/_settings.php';
$template = 'tpl_home';
$page = 'Home';
$lang = 'en';
 ?>
<!DOCTYPE html>
<?php include 'incl/_cc.php'; ?>
	<head>
		<meta charset="utf-8" />
		<title>Lemonade kit by Sidiostedalimones</title>
		<meta name="description" content="" />
		<?php include 'incl/_head.php'; ?>
	</head>
	<body class="<?php echo $template . '  ' . to_class( $page ); ?><?php if ( $dev ) { echo '  _dev'; } ?>">
		<div class="page">
			<?php include 'incl/_header.php'; ?>
			<?php include 'incl/_menu.php'; ?>

			<!-- Main content -->
			<main id="main" role="main">
				<div class="wrapper">
					<p>(Main content)</p>
				</div>
			</main>

			<?php include 'incl/_footer.php'; ?>

		</div>
		<?php include 'incl/_js.php'; ?>
		<?php include 'incl/_tag.php'; ?>

	</body>
</html>
